
export class HeaderData {

  private strTitle:    string;
  private strPath:     string;
  private strMessage:  string;


  constructor(strTitle:string, strPath:string, strMessage:string) {
    this.strTitle   = strTitle;
    this.strPath    = strPath;
    this.strMessage = strMessage;
  }

  public getTitle(): string {
    return this.strTitle;
  }

  public getPath(): string {
    return this.strPath;
  }

  public getMessage(): string {
    return this.strMessage;
  }

  public setTitle(strTitle: string) {
    this.strTitle = strTitle;
  }

  public setPath(strPath: string) {
    this.strPath = strPath;
  }

  public setMessage(strMessage: string) {
    this.strMessage = strMessage;
  }


}
