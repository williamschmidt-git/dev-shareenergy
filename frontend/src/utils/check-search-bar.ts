import { SearchFormat } from "../components/MainComponent";

export default function checkSearchBar (input: string) {
  if (input.toLocaleLowerCase().includes('@')){
    return SearchFormat.EMAIL;
  }

  if (/\d/.test(input.toLocaleLowerCase())){
    return SearchFormat.USERNAME;
  }

  return SearchFormat.NAME
}