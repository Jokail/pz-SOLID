export interface IFaxable {
  fax(document: string, recipientNumber: string): void;
}
