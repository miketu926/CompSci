const utm_param = (incomingSearchParam) => {

    const modifiedSearchParam = incomingSearchParam.replace('?', '');
    const paramTuples = modifiedSearchParam.split('&').map(el => el.split('='));
    let extCmpParam = 'extcmp=virtualwall';

    for (const paramTuple of paramTuples) {
        if (!paramTuple[0].includes('utm_campaign')) {
            extCmpParam += `_${paramTuple[1]}`;
        };
    };


    // return paramDoubles;
    const storeDomain = 'https://partycity.obsessvr.com/';
    const sku = '4314321';

    return `${storeDomain}wallCostumeLookup?costumeNo=${sku}&${extCmpParam}&source=obsess`;
};

console.log(utm_param('?utm_source=4567&utm_medium=homepagebanner&utm_campaign=2020virtualwall'));