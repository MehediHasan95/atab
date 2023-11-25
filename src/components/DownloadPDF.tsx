import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";

function DownloadPDF({ downloadData }: any) {
  const generatePdf = async () => {
    const pdf = new jsPDF("p", "pt");
    pdf
      .setFontSize(22)
      .text("ATAB Audit Trail Reports", 300, 30, { align: "center" });
    pdf.setFontSize(11).text(`Total: ${downloadData.length}`, 40, 50);
    pdf
      .setFontSize(11)
      .text(`Date: ${new Date().toDateString()}`, 555, 50, { align: "right" });

    autoTable(pdf, {
      showHead: "firstPage",
      head: [
        [
          "Audit ID",
          "Admin ID",
          "Admin Name",
          "Details",
          "Created at",
          "Photo",
        ],
      ],
      headStyles: { halign: "center", fillColor: [0, 0, 0] },
      body: downloadData.map(Object.values),
      bodyStyles: { minCellWidth: 10, overflow: "linebreak" },
      startY: 60,
      theme: "grid",
      willDrawPage: (data) => {
        // note: this function for footer
        pdf.setFontSize(10);
        pdf.text(
          "Page " + data.pageNumber,
          data.settings.margin.left,
          pdf.internal.pageSize.height - 20
        );
      },
    });
    pdf.save("audit_trail_report_generate.pdf");
  };

  return (
    <button
      onClick={generatePdf}
      className="text-sm px-5 py-2 bg-pink-500 text-white rounded-full"
    >
      Download PDF
    </button>
  );
}

export default DownloadPDF;
