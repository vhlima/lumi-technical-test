/*
  We use this mapping object to specify wich informations we want to extract
  from the invoice pdf file.
*/
interface LabelMapperItem {
  /* 
    We use this to find the specific location about our data.
    Label should always be a text that appears once in the document
    for finding purposes.
  */
  label: string;
  /* 
    The first number of this array is the rowIndex from the element based on
    label's rowIndex.

    Ex: labelRowIndex = 1, location = [1, 0], our valueRowIndex is going to be
    labelRowIndex + location[0] = valueRowIndex = 2 and we will search at index 0
    since location[1] = 0
  */
  location: [number, number];
  /* 
    Document values always come as string, this is only used if we need some 
    custom parsing for values 
  */
  parseValue?: (
    value: string,
    index: number,
    rowIndex: number,
    rows: string[][]
  ) => string | number | Date | Record<string, unknown> | unknown[];
}

export type LabelMappersObject<T = any> = { [key: string]: LabelMapperItem };

export interface LabelMapper {
  execute: (contentRows: string[][], items: LabelMappersObject) => Record<string, unknown>;
}