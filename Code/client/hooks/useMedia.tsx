// Hook
export function useMedia(queries: any[], values: { [x: string]: any; }, defaultValue: any) {
    // Array containing a media query list for each query
    const mediaQueryLists = queries.map((q: string) => window.matchMedia(q));
  
    // Function that gets value based on matching media query
    const getValue = () => {
      // Get index of first media query that matches
      const index = mediaQueryLists.findIndex((mql: { matches: any; }) => mql.matches);
      // Return related value or defaultValue if none
      return typeof values[index] !== 'undefined' ? values[index] : defaultValue;
    };
  
    // State and setter for matched value
    const [value, setValue] = useState(getValue);
  
    useEffect(
      () => {
        // Event listener callback
        // Note: By defining getValue outside of useEffect we ensure that it has ...
        // ... current values of hook args (as this hook callback is created once on mount).
        const handler = () => setValue(getValue);
        // Set a listener for each media query with above handler as callback.
        mediaQueryLists.forEach((mql: { addListener: (arg0: () => any) => any; }) => mql.addListener(handler));
        // Remove listeners on cleanup
        return () => mediaQueryLists.forEach((mql: { removeListener: (arg0: () => any) => any; }) => mql.removeListener(handler));
      },
      [] // Empty array ensures effect is only run on mount and unmount
    );
  
    return value;
  }

function useState(getValue: () => any): [any, any] {
    throw new Error("Function not implemented.");
}


function useEffect(arg0: () => () => any, arg1: never[]) {
    throw new Error("Function not implemented.");
}
