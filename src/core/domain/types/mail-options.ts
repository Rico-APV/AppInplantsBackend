export interface MailData {
  to: string;
  cc?: string;

  from: string;
  replyTo?: string;

  subject?: string;
  text?: string;
  html?: string;
  templateId: string;
  content?: MailContent[];
  dynamicTemplateData?: {
    [key: string]: string;
  };
}

export interface MailContent {
  type: string;
  value: string;
}
