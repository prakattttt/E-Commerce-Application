// Type for each individual categories

/* Type for each price range:
    All -> All
    P1 -> Under 100$
    P2 -> 100$ to 250$
    P3 -> 250$ to 500$
    Premium -> Premium
*/
export type TPrice = "All" | "P1" | "P2" | "P3" | "Premium"; 

// Type for sorting based on option
export type TSort = "Newest" | "Most-Popular" | "Fashion" | "Top-Rated" | "H-L" | "L-H";