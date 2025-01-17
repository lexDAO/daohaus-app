import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Flex, Box, Image, useToast, Icon } from '@chakra-ui/react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FaCopy } from 'react-icons/fa';

import { useDaoMember } from '../contexts/DaoMemberContext';
import MinionTransfer from './minionTransfer';
import SyncTokenButton from './syncTokenButton';
import Withdraw from './withdraw';
import { numberWithCommas } from '../utils/general';
import { displayBalance } from '../utils/tokenValue';

const balanceCard = ({ token, isBank = true, hasBalance, isNativeToken }) => {
  const toast = useToast();
  const { minion } = useParams();
  const { daoMember, delegate, isMember } = useDaoMember();
  const [needsSync, setNeedsSync] = useState(null);

  useEffect(() => {
    if (token?.contractBalances) {
      const wallet = daoMember?.hasWallet || delegate?.hasWallet;
      const isAccurateBalance =
        wallet &&
        isBank &&
        token.contractBalances.token !== token.contractBalances.babe;

      setNeedsSync(isAccurateBalance);
    }
  }, [token, isBank, daoMember, delegate]);

  const copiedToast = () => {
    toast({
      title: 'Copied Address',
      position: 'top-right',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Flex h='60px' align='center'>
      <Box w='25%' d={['none', null, null, 'inline-block']}>
        <Flex align='center'>
          {token?.logoUri && (
            <Image src={token.logoUri} height='35px' mr='15px' />
          )}
          <Box fontFamily='mono'>{token?.symbol}</Box>
          {!isNativeToken && (
            <CopyToClipboard text={token?.tokenAddress} onCopy={copiedToast}>
              <Icon
                as={FaCopy}
                color='secondary.300'
                ml={2}
                _hover={{ cursor: 'pointer' }}
              />
            </CopyToClipboard>
          )}
        </Flex>
      </Box>
      <Box w={['40%', null, null, '40%']}>
        <Box fontFamily='mono'>
          {`${displayBalance(token.tokenBalance, token.decimals) || 0} ${
            token.symbol
          }`}
        </Box>
      </Box>
      {!isNativeToken && (
        <>
          <Box w='20%' d={['none', null, null, 'inline-block']}>
            <Box fontFamily='mono'>
              <Box>{`$${numberWithCommas(token?.usd.toFixed(2)) || 0}`}</Box>
            </Box>
          </Box>
          <Box w={['25%', null, null, '30%']}>
            <Box fontFamily='mono'>
              <Box>
                {`$${numberWithCommas(token?.totalUSD.toFixed(2)) || 0}`}
              </Box>
            </Box>
          </Box>
        </>
      )}

      <Box w={['10%', null, null, '30%']} d='inline-block' textAlign='right'>
        {hasBalance && <Withdraw token={token} />}
        {needsSync && <SyncTokenButton token={token} />}
        {minion && token?.tokenBalance > 0 && (
          <MinionTransfer
            isMember={isMember}
            isNativeToken={isNativeToken}
            minion={minion}
            token={token}
          />
        )}
      </Box>
    </Flex>
  );
};

export default balanceCard;
