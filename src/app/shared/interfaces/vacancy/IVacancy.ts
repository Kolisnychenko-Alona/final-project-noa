export interface IVacancyRequest {
   name: string;
   path: string;
   imagePath: string;
   title: string;
   city: string;
   place: string;
   employment: string;
   description: string;
}

export interface IVacancyResponse extends IVacancyRequest {
   id: string;
}