import { MINION_TYPES, PROPOSAL_TYPES } from '../utils/proposalUtils';
import { FIELD, INFO_TEXT, FORM_DISPLAY } from './fields';
import { TX } from './contractTX';

export const FORM = {
  MEMBER: {
    title: 'Membership',
    subtitle: 'Request Shares and/or Loot',
    type: PROPOSAL_TYPES.MEMBER,
    required: ['title', 'sharesRequested'], // Use name key from proposal type object
    tx: TX.SUBMIT_PROPOSAL,
    fields: [
      FIELD.TITLE,
      FIELD.SHARES_REQUEST,
      FIELD.DESCRIPTION,
      FIELD.TRIBUTE,
      FIELD.LINK,
    ],
    additionalOptions: [
      FIELD.APPLICANT,
      FIELD.LOOT_REQUEST,
      FIELD.PAYMENT_REQUEST,
    ],
  },
  FUNDING: {
    title: 'Funding',
    subtitle: 'Request or distribute funds',
    type: PROPOSAL_TYPES.FUNDING,
    required: ['title', 'applicant'], // Use name key from proposal type object
    tx: TX.SUBMIT_PROPOSAL,
    fields: [
      FIELD.TITLE,
      FIELD.APPLICANT,
      FIELD.DESCRIPTION,
      FIELD.PAYMENT_REQUEST,
      FIELD.LINK,
    ],
    additionalOptions: [
      FIELD.SHARES_REQUEST,
      FIELD.LOOT_REQUEST,
      FIELD.TRIBUTE,
    ],
    customValidations: ['nonDaoApplicant'],
  },
  TOKEN: {
    title: 'Token',
    subtitle: 'Approve a new token.',
    type: PROPOSAL_TYPES.WHITELIST,
    required: ['title', 'tokenAddress'], // Use name key from proposal type object
    tx: TX.WHITELIST_TOKEN_PROPOSAL,
    fields: [
      FIELD.TITLE,
      { ...FIELD.ONLY_ERC20, name: 'tokenAddress' },
      FIELD.LINK,
      FIELD.DESCRIPTION,
    ],
  },
  TRADE: {
    title: 'Trade',
    subtitle: 'Remove a Member',
    type: PROPOSAL_TYPES.TRADE,
    required: ['title'],
    tx: TX.SUBMIT_PROPOSAL,
    fields: [
      FIELD.TITLE,
      FIELD.TRIBUTE,
      FIELD.DESCRIPTION,
      FIELD.PAYMENT_REQUEST,
      FIELD.LINK,
    ],
    additionalOptions: [
      FIELD.APPLICANT,
      FIELD.LOOT_REQUEST,
      FIELD.SHARES_REQUEST,
    ],
  },
  GUILDKICK: {
    title: 'Guild Kick',
    subtitle: 'Remove a Member.',
    type: PROPOSAL_TYPES.GUILDKICK,
    required: ['title', 'applicant'], // Use name key from proposal type object
    tx: TX.GUILDKICK_PROPOSAL,
    fields: [
      FIELD.TITLE,
      {
        ...FIELD.APPLICANT,
        label: 'Member to Kick',
        info: INFO_TEXT.ADDR_KICK,
      },
      FIELD.DESCRIPTION,
      FIELD.LINK,
    ],
  },
  SIGNAL: {
    type: PROPOSAL_TYPES.SIGNAL,
    tx: TX.SUBMIT_PROPOSAL,
    required: ['title'], // Use name key from proposal type object
    fields: [FIELD.TITLE, FIELD.DESCRIPTION, FIELD.LINK],
  },
  MINION: {
    title: 'Minion Proposal',
    subtitle: 'Extend DAO proposals to external contracts',
    type: PROPOSAL_TYPES.MINION_DEFAULT,
    required: ['targetContract', 'title', 'selectedMinion'], // Use name key from proposal type object
    minionType: MINION_TYPES.VANILLA,
    tx: TX.MINION_PROPOSE_ACTION,
    fields: [
      FIELD.TITLE,
      FIELD.MINION_SELECT,
      FIELD.TARGET_CONTRACT,
      FIELD.ABI_INPUT,
    ],
    additionalOptions: [
      FIELD.MINION_PAYMENT,
      { ...FIELD.DESCRIPTION, h: '10' },
    ],
  },
  UPDATE_DELEGATE: {
    title: 'UPDATE DELEGATE ADDRESS',
    layout: 'singleRow',
    required: ['delegateAddress'],
    tx: TX.UPDATE_DELEGATE,
    fields: [FIELD.DELEGATE_ADDRESS],
  },
  LOOT_GRAB: {
    title: 'Loot Grab proposal',
    layout: 'singleRow',
    subtitle: 'Request loot with a tribute',
    required: ['tributeOffered'],
    tx: TX.LOOT_GRAB_PROPOSAL,
    fields: [FORM_DISPLAY.LOOT_REQUEST, FIELD.TRIBUTE],
  },
  PAYROLL: {
    title: 'Payroll Proposal',
    layout: 'singleRow',
    type: PROPOSAL_TYPES.PAYROLL,
    subtitle: 'Pay Members with a minion',
    required: ['selectedMinion', 'minionPayment', 'applicant'],
    minionType: MINION_TYPES.VANILLA,
    tx: TX.PAYROLL,
    fields: [
      FIELD.MINION_SELECT,
      FIELD.MINION_PAYMENT,
      FIELD.APPLICANT,
      FIELD.DESCRIPTION,
    ],
  },
  MINION_SEND_NETWORK_TOKEN: {
    title: 'Network Token Transfer',
    subtitle: 'Make a proposal to transfer tokens out of the minion',
    layout: 'singleRow',
    type: PROPOSAL_TYPES.MINION_NATIVE,
    required: ['minionPayment', 'applicant', 'description'],
    minionType: MINION_TYPES.VANILLA,
    tx: TX.MINION_SEND_NETWORK_TOKEN,
    fields: [FIELD.MINION_PAYMENT, FIELD.APPLICANT, FIELD.DESCRIPTION],
  },
  MINION_SEND_ERC20_TOKEN: {
    title: 'ERC20 Token Transfer',
    subtitle: 'Make a proposal to transfer tokens out of the minion',
    layout: 'singleRow',
    type: PROPOSAL_TYPES.MINION_ERC20,
    required: ['minionPayment', 'applicant'],
    minionType: MINION_TYPES.VANILLA,
    tx: TX.MINION_SEND_ERC20_TOKEN,
    fields: [FIELD.MINION_PAYMENT, FIELD.APPLICANT, FIELD.DESCRIPTION],
  },
  MINION_SEND_ERC721_TOKEN: {
    title: 'ERC721 Token Transfer',
    subtitle: 'Make a proposal to transfer the nft out of the minion',
    layout: 'singleRow',
    type: PROPOSAL_TYPES.MINION_ERC721,
    required: ['applicant'],
    minionType: MINION_TYPES.VANILLA,
    tx: TX.MINION_SEND_ERC721_TOKEN,
    fields: [FIELD.APPLICANT, FIELD.DESCRIPTION],
  },
  MINION_SELL_NIFTY: {
    title: 'Sell Nifty ERC721',
    subtitle: 'Make a proposal to set the price of the nft on nifty.ink',
    layout: 'singleRow',
    type: PROPOSAL_TYPES.MINION_NIFTY_SELL,
    required: ['price'],
    minionType: MINION_TYPES.VANILLA,
    tx: TX.MINION_NIFTY_SET_PRICE,
    fields: [FIELD.NFT_PRICE, FIELD.DESCRIPTION],
  },
  MINION_NIFTY_INK: {
    title: 'Buy A Nifty Ink Proposal',
    subtitle: 'Make a proposal to purchase an nft from your nifty minion',
    type: PROPOSAL_TYPES.MINION_NIFTY,
    required: ['selectedMinion', 'link', 'minionPayment'], // Use name key from proposal type object
    minionType: MINION_TYPES.NIFTY,
    tx: TX.MINION_PROPOSE_ACTION,
    fields: [FIELD.MINION_SELECT, FIELD.NIFTY_INK_LINK, FIELD.MINION_PAYMENT],
  },
};
// TODO: special field for this minion payment - message about money comes from treasury
// - maybe 2 inputs - repayment from treasury - could be anything
// - then one that gets price of nifty
