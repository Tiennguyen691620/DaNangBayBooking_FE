import * as XLSX from 'xlsx-js-style';
import { Observable } from 'rxjs';
import * as FileSaver from 'file-saver';

export type AOA = any[][];
export type XLSX_Sheet_Data = Map<number, AOA>;

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

export class XLSXFile {
  static readFile(
    file: File
  ): Observable<{ sheets: string[]; sheetData: XLSX_Sheet_Data }> {
    return new Observable(observer => {
      const reader: FileReader = new FileReader();
      reader.onload = (e: any) => {
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, { type: 'binary' });

        const data = { sheets: [], sheetData: {} };
        for (let index = 0; index < wb.SheetNames.length; index++) {
          const wsName: string = wb.SheetNames[index];
          const ws: XLSX.WorkSheet = wb.Sheets[wsName];
          data.sheets[index] = wsName;
          data.sheetData[index] = XLSX.utils.sheet_to_json(ws, { header: 1 });
        }

        observer.next(data as { sheets: string[]; sheetData: XLSX_Sheet_Data });
        observer.complete();
      };
      reader.readAsBinaryString(file);
    });
  }

  static exportAsExcelFile(data: any, excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }

  // Báo cáo Lượt đặt khách hủy phòng
  // static reportBookingCancel(headers: any, data: any, excelFileName: string, filterModel: CancelBookingReportExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1, 1, 1
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'BÁO CÁO THỐNG KÊ LƯỢT KHÁCH ĐẶT HỦY PHÒNG', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       }
  //     }
  //   };
  //   worksheet['C2'] = { t: 's', v: 'Cơ sở lưu trú:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.accommodation };

  //   worksheet['F2'] = { t: 's', v: 'Trạng thái:', s: { font: { bold: true } } };
  //   worksheet['G2'] = { t: 's', v: filterModel.status };

  //   worksheet['C3'] = { t: 's', v: 'Ngày đặt phòng:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.bookingDateFrom };

  //   worksheet['F3'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.bookingDateTo };

  //   worksheet['C4'] = { t: 's', v: 'Ngày nhận/trả phòng:', s: { font: { bold: true } } };
  //   worksheet['D4'] = { t: 's', v: filterModel.checkInDateFrom };

  //   worksheet['F4'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G4'] = { t: 's', v: filterModel.checkInDateTo };

  //   worksheet['C5'] = { t: 's', v: 'Loại sản phẩm,', s: { font: { bold: true } } };
  //   worksheet['D5'] = { t: 's', v: filterModel.productType };

  //   worksheet['F5'] = { t: 's', v: 'Khách hàng,', s: { font: { bold: true } } };
  //   worksheet['G5'] = { t: 's', v: filterModel.customer };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A6",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'TK luotkhachdat_huyphong': worksheet }, SheetNames: ['TK luotkhachdat_huyphong'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // Báo cáo Quản lý gift voucher phát hành
  // static reportVoucherRelease(headers: any, data: any, excelFileName: string, filterModel: VoucherReleasedReporExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1,
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'QUẢN LÝ GIFT VOUCHER PHÁT HÀNH', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       }
  //     }
  //   };
  //   worksheet['C2'] = { t: 's', v: 'Cơ sở lưu trú:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.accommodation };

  //   // worksheet['F2'] = { t: 's', v: 'Chương trình:', s: { font: { bold: true } } };
  //   // worksheet['G2'] = { t: 's', v: filterModel.program };

  //   worksheet['C3'] = { t: 's', v: 'Ngày phát hành:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.fromDate };

  //   worksheet['F3'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.toDate };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A4",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'GVphathanh': worksheet }, SheetNames: ['GVphathanh'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // Báo cáo Thông tin cơ sở lưu trú
  // static reportAccommodation(headers: any, data: any, excelFileName: string, filterModel: AccommodationInfoReportExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1,
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'THÔNG TIN CƠ SỞ LƯU TRÚ', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       }
  //     }
  //   };
  //   worksheet['C2'] = { t: 's', v: 'Loại Cơ sở lưu trú:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.type };

  //   worksheet['F2'] = { t: 's', v: 'Tỉnh/thành phố:', s: { font: { bold: true } } };
  //   worksheet['G2'] = { t: 's', v: filterModel.stateProvince };

  //   worksheet['C3'] = { t: 's', v: 'Ngày phát hành:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.fromDate };

  //   worksheet['F3'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.toDate };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A4",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'ThongtinCSLT': worksheet }, SheetNames: ['ThongtinCSLT'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  // Báo cáo nhật ký đăng nhập người dùng
  // static reportUserLogin(headers: any, data: any, excelFileName: string, filterModel: ReportUserExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1,
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'BÁO CÁO NHẬT KÝ ĐĂNG NHẬP NGƯỜI DÙNG', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       },
  //     }
  //   };
  //   worksheet['C2'] = { t: 's', v: 'Loại đối tượng:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.objectType };

  //   worksheet['C3'] = { t: 's', v: 'Từ ngày:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.fromDate };

  //   worksheet['F3'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.toDate };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A4",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'Nhatkydangnhap&nguoidung': worksheet }, SheetNames: ['Nhatkydangnhap&nguoidung'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }


  // Báo cáo Sản phẩm sở hữu và đóng phí thường niên
  // static reportProductOwernship(headers: any, data: any, excelFileName: string, filterModel: ReportProductOwnerShipExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1,
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'BÁO CÁO SẢN PHẨM SỞ HỮU & ĐÓNG PHÍ THƯỜNG NIÊN', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       }
  //     }
  //   };

  //   worksheet['C2'] = { t: 's', v: 'Tên sản phẩm:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.product };

  //   // worksheet['F2'] = { t: 's', v: 'Chương trình:', s: { font: { bold: true } } };
  //   // worksheet['G2'] = { t: 's', v: filterModel.program };

  //   worksheet['C3'] = { t: 's', v: 'Từ ngày:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.fromDate };

  //   worksheet['F3'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.toDate };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A4",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'SPsohuu_dongphithuongnien': worksheet }, SheetNames: ['SPsohuu_dongphithuongnien'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }

  private static saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  // Báo cáo Thông tin KH thành viên
  // static reportMemberCustomerInformation(
  //   headers: any,
  //   data: any,
  //   excelFileName: string,
  //   filterModel: MemberCustomerInformationReporExcel): void {
  //   const header = {};
  //   // tslint:disable-next-line:forin
  //   for (const property in headers) {
  //     header[property] = {
  //       t: 's', v: property, s: {
  //         font: { bold: true }, alignment: {
  //           horizontal: property === 'STT' ? 'center' : 'left'
  //         },
  //         border: {
  //           top: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           bottom: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           left: {
  //             style: 'thin',
  //             color: '000000'
  //           },
  //           right: {
  //             style: 'thin',
  //             color: '000000'
  //           }
  //         }
  //       },
  //     };
  //   }
  //   data = [
  //     headers, 1, 1, 1, 1
  //   ].concat(data);
  //   const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data, { skipHeader: true });
  //   // worksheet['A1'] = { t: 's', v: 'logo' };
  //   worksheet['B1'] = {
  //     t: 's', v: 'THÔNG TIN KHÁCH HÀNG THÀNH VIÊN', s: {
  //       font: {
  //         bold: true,
  //       },
  //       alignment: {
  //         vertical: 'center',
  //         horizontal: 'center',
  //       }
  //     }
  //   };
  //   worksheet['C2'] = { t: 's', v: 'Từ khóa:', s: { font: { bold: true } } };
  //   worksheet['D2'] = { t: 's', v: filterModel.searchKey };

  //   worksheet['F2'] = { t: 's', v: 'Trạng thái:', s: { font: { bold: true } } };
  //   worksheet['G2'] = { t: 's', v: filterModel.status };

  //   worksheet['C3'] = { t: 's', v: 'Kích hoạt TK từ ngày:', s: { font: { bold: true } } };
  //   worksheet['D3'] = { t: 's', v: filterModel.activedDateFrom };

  //   worksheet['F3'] = { t: 's', v: 'Tỉnh/TP:', s: { font: { bold: true } } };
  //   worksheet['G3'] = { t: 's', v: filterModel.province };

  //   worksheet['C4'] = { t: 's', v: 'Đến ngày:', s: { font: { bold: true } } };
  //   worksheet['D4'] = { t: 's', v: filterModel.activedDateTo };

  //   XLSX.utils.sheet_add_json(worksheet,
  //     [
  //       header
  //     ],
  //     {
  //       skipHeader: true,
  //       origin: "A5",
  //     }
  //   );

  //   worksheet['!merges'] = [
  //     { s: { c: 1, r: 0 }, e: { c: 9, r: 0 } },
  //   ];
  //   const workbook: XLSX.WorkBook = { Sheets: { 'ThongtinKHthanhvien': worksheet }, SheetNames: ['ThongtinKHthanhvien'] };

  //   // workbook.add_format({'bold': True})
  //   // XLSX.utils.book_new();
  //   const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  //   this.saveAsExcelFile(excelBuffer, excelFileName);
  // }
}
