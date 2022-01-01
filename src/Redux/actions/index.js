const SWITCH_CURRENCY = 'SWITCH_CURRENCY';

export default function switchCurrency(currency) {
  return ({
    type: SWITCH_CURRENCY,
    currency,
  })
}
