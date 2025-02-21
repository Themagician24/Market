export function formatCurrency (
    amount: number,
    currencyCode: string = "GBP" ) : string {

        try {
            return new Intl.NumberFormat("fr-GB", {
                style: "currency",
                currency: currencyCode.toUpperCase(),
            }).format(amount);
        } catch (error) {

            //Fallback formatting if currency code is invalid

            console.error("Invalid curency code:", currencyCode, error);
            return`${currencyCode.toUpperCase()}${amount.toFixed(2)}`;
            
        }

    }
