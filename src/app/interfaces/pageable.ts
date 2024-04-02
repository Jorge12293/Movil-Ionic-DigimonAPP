export interface Pageable {
  currentPage:    number;
  elementsOnPage: number;
  totalElements:  number;
  totalPages:     number;
  previousPage?:   string;
  nextPage?:       string;
}
