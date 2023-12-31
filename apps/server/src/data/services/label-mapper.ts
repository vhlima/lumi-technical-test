import { LabelMapper, LabelMappersObject } from "@/domain/usecases";

export class LabelMapperService implements LabelMapper {
  public execute(
    contentRows: string[][],
    items: LabelMappersObject
  ): Record<string, unknown> {
    const invoiceData: Record<string, unknown> = {};

    const mappingEntries = Object.entries(items);

    /* 
      The key of this algorithm is finding relatively close elements by some text label
      and then find our desired value at index X + Y, after the X label index.

      We recommend using some unique text that would appear only once, this will
      ensure that we are scrapping the data correctly. 
    */

    /*
      This algo has a quadratic time complexity, wich is not good in terms of
      performance. For now we are sticking with this because we are not
      worried about performance here.
    */

    for (let i = 0; i < contentRows.length; i++) {
      for (let y = 0; y < contentRows[i].length; y++) {
        const rowFound = mappingEntries.filter(
          ([, mapping]) => contentRows[i][y] === mapping.label
        );

        /* Search through every row element to try to find our label row */
        if (rowFound) {
          /* We can have multiple mappers with the same label */
          for (let z = 0; z < rowFound.length; z++) {
            const [key, mapping] = rowFound[z];
            /* Value row index would be currentRowIndex + mappingIndexCount */
            const possibleValueRowIndex = i + mapping.location[0];

            if (possibleValueRowIndex < contentRows.length) {
              const row = contentRows[possibleValueRowIndex];
              const possibleValueIndex = mapping.location[1];

              if (possibleValueIndex < row.length) {
                const value = row[possibleValueIndex];

                /* After the value is found, add to the invoice object */
                invoiceData[key] = mapping.parseValue
                  ? mapping.parseValue(
                      value,
                      possibleValueIndex,
                      possibleValueRowIndex,
                      contentRows
                    )
                  : value;
              }
            }
          }
        }
      }
    }

    return invoiceData;
  }
}
