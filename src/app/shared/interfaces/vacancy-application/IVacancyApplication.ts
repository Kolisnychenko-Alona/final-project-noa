import { IVacancyResponse } from "../vacancy/IVacancy";

export interface IVacancyApplicationRequest {
  vacancyName: string;
  firstName: string;
  secondName: string;
  filePath: string;
  // fileUrl: string;
  email: string;
  phone: number;
  text: string;
}

export interface IVacancyApplicationResponse extends IVacancyApplicationRequest {
  id: string;
}
