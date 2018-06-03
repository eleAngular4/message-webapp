export class Message {
  id: number;
  title: string;
  content: string;
  beginDate: Date;
  endDate: Date;

  constructor(title: string, content: string, beginDate: Date, endDate: Date, id?: number) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.beginDate = beginDate;
    this.endDate = endDate;
  }

}
