namespace coingecko;

using {cuid} from '@sap/cds/common';

entity Coins {
    key id                  : String;
        name                : String;
        symbol              : String;
        high_price_last_24h : Double;
        low_price_last_24h  : Double;
}
