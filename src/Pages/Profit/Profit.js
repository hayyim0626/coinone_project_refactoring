import React, { useState } from 'react';
import styled from 'styled-components';
import Nav from '../../Components/Nav/Nav';
import Footer from '../../Components/Footer/Footer';

const barMenu = [
  '코인명',
  '보유수량',
  '매수 평균가',
  '매수 금액',
  '평가 금액',
  '수익률',
];

const Profit = () => {
  const [tradingData, setTradingData] = useState({
    // redux로 데이터를 받아올 예정 레이아웃 작업으로 인해 미리 설정해놓았습니다.
    coin_list: [
      {
        icon:
          'https://cdn.pixabay.com/photo/2016/11/05/20/08/sunflower-1801284_960_720.png',
        coin_name: '썬쓰',
        coin_code: 'SUNS',
        quantity: 251.0,
        average_buying_price: {
          price__avg: 1000.0,
        },
        buying_price: 1000.0,
        current_price: 1000.0,
        profit_rate: 0,
      },
      {
        icon:
          'https://cdn.pixabay.com/photo/2012/04/24/12/33/circle-39783_960_720.png',
        coin_name: '피블쓰',
        coin_code: 'PIBS',
        quantity: 10.0,
        average_buying_price: {
          price__avg: 1000.0,
        },
        buying_price: 1000.0,
        current_price: 1000.0,
        profit_rate: 0,
      },
    ],
    total_asset: 2285594804.0,
    won_balance: 2285333804.0,
    coin_balance: 261000.0,
    total_buy_price: 261000.0,
    profit: -47.4,
    profit_rate: 0,
  });
  const {
    coin_list,
    total_asset,
    won_balance,
    coin_balance,
    total_buy_price,
    profit,
    profit_rate,
  } = tradingData;

  // useEffect로 실행할 예정입니다
  const getInitialData = async () => {
    const res = await fetch('api', {
      headers: {
        Authorization: localStorage.getItem('token'),
      },
    });
    const firstTradingData = await res.json();

    //여기에다가 dispatch 해야할 에정입니다
    setTradingData(firstTradingData);
  };

  return (
    <>
      <Nav />
      <ProfitWrap>
        <MenuVertical>
          <ul>
            <li>수익현황</li>
            <li>입출금</li>
            <li>이용내역</li>
          </ul>
        </MenuVertical>
        <ProfitStatusContainer>
          <span>수익현황</span>
          <TotalAssetContainer>
            <TotalAsset>
              <span>총 보유자산</span>
              <span>{total_asset.toLocaleString('en')}원</span>
            </TotalAsset>
            <OwnAsset>
              <ItemAndPrice>
                <span>보유 원화</span>
                <span>{won_balance.toLocaleString('en')}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>보유 암호화폐</span>
                <span>{coin_balance.toLocaleString('en')}원</span>
              </ItemAndPrice>
            </OwnAsset>
            <TradingAsset>
              <ItemAndPrice>
                <span>총매수금액</span>
                <span>{total_buy_price.toLocaleString('en')}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>평가 손익</span>
                <span>{profit}원</span>
              </ItemAndPrice>
              <ItemAndPrice>
                <span>수익률</span>
                <span>{profit_rate}%</span>
              </ItemAndPrice>
            </TradingAsset>
          </TotalAssetContainer>
          <AssetByOrderContainer>
            <p>
              매수평균가, 평가금액, 평가손익, 수익률은 모두 KRW로 환산한 추정
              값으로 참고용입니다
            </p>
            <AssetByOrder>
              <AssetByOrderBar>
                {barMenu.map((menu, menuIdx) => (
                  <div key={menuIdx}>
                    <span>{menu}</span>
                  </div>
                ))}
              </AssetByOrderBar>
              <AssetByOrderList>
                {coin_list.map((trade, tradeIdx) => {
                  return (
                    <ul key={tradeIdx}>
                      <li>
                        <div>
                          <img alt="coinImg" src={trade.icon} />
                          {trade.coin_code}
                        </div>
                        <span>{trade.coin_name}</span>
                      </li>
                      <li>{trade.quantity}</li>
                      <li>
                        {trade.average_buying_price.price__avg.toLocaleString()}
                        원
                      </li>
                      <li>{trade.buying_price.toLocaleString()}원</li>
                      <li>{trade.current_price.toLocaleString()}원</li>
                      <li>{trade.profit_rate}%</li>
                    </ul>
                  );
                })}
              </AssetByOrderList>
            </AssetByOrder>
          </AssetByOrderContainer>
        </ProfitStatusContainer>
      </ProfitWrap>
      <Footer />
    </>
  );
};

export default Profit;

const ProfitWrap = styled.div`
  margin-top: 50px;
  padding: 80px 0;
  height: 800px;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const MenuVertical = styled.div`
  width: 15%;
  height: 100%;
  border-right: 1px solid #c9ccd2;
  li {
    :first-child {
      ${({ theme }) => theme.text('20px', '700', '#1772f8')};
    }
    margin-bottom: 40px;
    ${({ theme }) => theme.text('20px', '700', '#c9ccd2')};
  }
`;

const ProfitStatusContainer = styled.div`
  width: 70%;
  height: 100%;
  padding-left: 5%;
  & > span {
    ${({ theme }) => theme.text('40px', '700')};
  }
`;

const TotalAssetContainer = styled.div`
  width: 100%;
  height: 130px;
  margin: 50px 0;
  border-top: 1px solid #c9ccd2;
  border-bottom: 1px solid #c9ccd2;
  ${({ theme }) => theme.flex('center', 'center')};
`;

const TotalAsset = styled.div`
  width: 33%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  span {
    :first-child {
      font-size: 14px;
      margin-bottom: 10px;
    }
    :last-child {
      ${({ theme }) => theme.text('34px', '500')}
    }
  }
`;

const ItemAndPrice = styled.div`
  width: 100%;
  padding: 0 30px;
  ${({ theme }) => theme.flex('space-between', 'center')};
  span {
    margin: 10px 0;
  }
`;

const OwnAsset = styled.div`
  width: 34%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
`;

const TradingAsset = styled.div`
  width: 33%;
  height: 100%;
  ${({ theme }) => theme.flex('center', 'center', 'column')}
  span {
    color: #79818f;
  }
`;

const AssetByOrderContainer = styled.div`
  width: 100%;
  & > p {
    ${({ theme }) => theme.text('12px', 400, '#79818f')}
  }
`;

const AssetByOrder = styled.div`
  margin-top: 20px;
`;

const AssetByOrderBar = styled.div`
  width: 100%;
  height: 40px;
  border-top: 1px solid #c9ccd2;
  border-bottom: 1px solid #c9ccd2;
  background-color: #f8f8f9;
  ${({ theme }) => theme.flex('center', 'center')}
  div {
    :first-child {
      width: 25%;
    }
    width: 15%;
    span {
      padding-left: 10px;
      font-size: 14px;
    }
  }
`;

const AssetByOrderList = styled.div`
  width: 100%;
  ul {
    width: 100%;
    height: 70px;
    border-bottom: 1px solid #c9ccd2;
    ${({ theme }) => theme.flex('center', 'center')};
    li {
      width: 15%;
      padding-left: 10px;
      font-size: 14px;
      :first-child {
        width: 25%;
        div {
          ${({ theme }) => theme.flex(null, 'center')};
          img {
            margin: 5px;
            width: 20px;
          }
        }
        span {
          margin-left: 5px;
          ${({ theme }) => theme.text('5px', null, '#79818f')}
        }
      }
    }
  }
`;
