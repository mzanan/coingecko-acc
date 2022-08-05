using {coingecko as my} from '../db/schema';

@requires : 'authenticated-user'
service Api {
    entity Coins as projection on my.Coins;
}
