import { supportedChains } from './chain';
import { utils } from 'web3';

export const parseSummonresAndShares = (data) => {
  if (!data) {
    return [[], []];
  }
  const lines = data.split('\n');
  const addrs = [];
  const amounts = [];
  lines.forEach((line) => {
    const summoner = line.split(' ');
    addrs.push(summoner[0]);
    amounts.push(summoner[1]);
  });
  return [addrs, amounts];
};

export const periodsPerDayPreset = (seconds) => {
  const hours = +seconds / 60 / 60;

  const perDay = Math.ceil(24 / hours);

  if (24 / hours < 1) {
    return `Less than ${perDay} per day`;
  } else {
    return `${perDay} per day`;
  }
};

export const formatPeriodLength = (periods, duration) => {
  const periodSeconds = +periods * duration;
  const days = periodSeconds / 60 / 60 / 24;
  return `${days} day${days > 1 ? 's' : ''}`;
};

export const formatDepositWei = (amount) => {
  return utils.fromWei(amount.toString(), 'ether');
};

export const daoConstants = (chainId) => {
  const constants = {
    abortWindow: '1',
    dilutionBound: '3',
    version: '2.1',
  };

  if (chainId === '0x64') {
    constants.approvedToken = supportedChains['0x64'].wxdai_contract;
  }

  return constants;
};

export const daoPresets = (chainId) => {
  let presets = [
    {
      presetName: 'Guilds',
      presetSubtitle: 'Work collectively to offer services',
      presetDescription:
        'Best for Worker Cooperatives with small to medium financial throughput.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      minimumTribute: '100',
      votingPeriod: '60',
      gracePeriod: '24',
      proposalDeposit: '5000000000000000000',
      processingReward: '2000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#4FBF9F',
      version: '2.1',
    },
    {
      presetName: 'Clubs',
      presetSubtitle: 'Little to no financial decisions',
      presetDescription:
        'Hang with your friends and commrades to nerd out or just chill.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      minimumTribute: '10',
      votingPeriod: '4320',
      gracePeriod: '2880',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '60',
      summonerShares: 1,
      color: '#F16061',
      version: '2.1',
    },
    {
      presetName: 'Ventures',
      presetSubtitle: 'Large to XL financial decisions',
      presetDescription:
        'Invest on chain with a venture fund at your fingertips.',
      currency: 'WETH',
      approvedToken: supportedChains[chainId].weth_contract,
      minimumTribute: '50',
      votingPeriod: '7',
      gracePeriod: '7',
      proposalDeposit: '100000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '86400',
      summonerShares: 1,
      color: '#AB3593',
      version: '2.1',
    },
    {
      presetName: 'Grants',
      presetSubtitle: 'Distribute wealth together',
      presetDescription: 'Spread around the wealth and accelerate good stuff.',
      currency: 'WETH',
      approvedToken: supportedChains[chainId].weth_contract,
      minimumTribute: '10',
      votingPeriod: '168',
      gracePeriod: '72',
      proposalDeposit: '10000000000000000',
      processingReward: '10000000000000000',
      periodDuration: '3600',
      summonerShares: 1,
      color: '#ea8923',
      version: '2.1',
    },

    {
      presetName: 'Products',
      presetSubtitle: 'Govern a Product or Protocol',
      presetDescription:
        'Raid together to get projects and products done in record time.',
      currency: 'DAI',
      approvedToken: supportedChains[chainId].dai_contract,
      minimumTribute: '250',
      votingPeriod: '60',
      gracePeriod: '36',
      proposalDeposit: '5000000000000000000',
      processingReward: '5000000000000000000',
      periodDuration: '7200',
      summonerShares: 1,
      color: '#513e97',
      version: '2.1',
    },
  ];

  if (chainId === '0x64') {
    presets = presets.map((preset) => {
      preset.currency = 'WXDAI';
      preset.approvedToken = supportedChains[chainId].wxdai_contract;
      preset.proposalDeposit = '100000000000000000';
      preset.processingReward = '10000000000000000';

      return preset;
    });
  }
  return presets;
};

export const currencyOptions = (chainId) => {
  let options;

  if (chainId === '0x64') {
    options = [
      {
        value: 'WXDAI',
        label: 'WXDAI',
        address: supportedChains[chainId].wxdai_contract,
      },
    ];
  } else {
    options = [
      {
        value: 'DAI',
        label: 'DAI',
        address: supportedChains[chainId].dai_contract,
      },
      {
        value: 'WETH',
        label: 'WETH',
        address: supportedChains[chainId].weth_contract,
      },
    ];
  }

  return options;
};