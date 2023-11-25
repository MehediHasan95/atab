import FileSaver from "file-saver";
import { IProducts } from "../types/ProductsTypes";
import Excel from "exceljs";

const DownloadExcel = ({ downloadData }: any) => {
  const workbook = new Excel.Workbook();

  const downloadAuditExcelReport = async () => {
    const sheet = workbook.addWorksheet("audit_trail_report_generate");
    sheet
      .addRow(["ID", "Title", "Price", "Description", "Category", "Image"])
      .eachCell((cell) => (cell.font = { bold: true }));
    downloadData.map(
      ({ id, title, price, description, category, image }: IProducts) =>
        sheet.addRow([id, title, price, description, category, image])
    );
    const genarateExcelFile = await workbook.xlsx.writeBuffer();
    FileSaver.saveAs(
      new Blob([genarateExcelFile]),
      "audit_trail_report_generate.xlsx"
    );
  };

  return (
    <button
      onClick={downloadAuditExcelReport}
      className="text-sm px-5 py-2 bg-purple-500 text-white rounded-full"
    >
      Download Excel
    </button>
  );
};

export default DownloadExcel;
