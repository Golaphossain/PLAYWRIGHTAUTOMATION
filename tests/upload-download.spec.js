const { test, expect } = require('@playwright/test')
const ExcelJs = require('exceljs')
async function writeExcel(searchText, replaceText, change, filePath) {
    const workbook = new ExcelJs.Workbook()
    await workbook.xlsx.readFile(filePath)
    const worksheet = workbook.getWorksheet('Sheet1')
    const targetCell = await readExcel(worksheet, searchText)
    const cell = worksheet.getCell(targetCell.row + change.rowChange, targetCell.column + change.columnChange)
    cell.value = replaceText
    await workbook.xlsx.writeFile(filePath)
}
async function readExcel(worksheet, searchText) {
    let targetCell = { row: -1, column: -1 }
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                targetCell.row = rowNumber
                targetCell.column = colNumber
            }
        })
    })
    return targetCell
}
//update mango price to 500
test('uplaod download excel file', async ({ page }) => {
    const textSearch = 'Mango'
    const updateValue = '350'
    const downloadsPath = 'E:/'
    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html")
    const downloadPromise = page.waitForEvent('download')
    await page.getByRole('button', { name: 'Download' }).click()
    const download = await downloadPromise
    await download.saveAs(`${downloadsPath}download.xlsx`)
    await writeExcel(textSearch, updateValue, { rowChange: 0, columnChange: 2 }, `${downloadsPath}download.xlsx`)
    await page.locator("#fileinput").click()
    await page.locator("#fileinput").setInputFiles(`${downloadsPath}download.xlsx`)
    const textlocator = page.getByText(textSearch)
    const desiredRow = await page.getByRole('row').filter({ has: textlocator })
    await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue)
})