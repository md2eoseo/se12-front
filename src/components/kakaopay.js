import {useState} from 'react';
import axios from 'axios';
import { useQuery } from '@apollo/client';
import { SEE_ITEM_QUERY } from './BuyNow';
import { useLocation, useHistory } from 'react-router-dom';

function useQueryString() {
  return new URLSearchParams(useLocation().search);
}

function Kakaopay() {const queries = useQueryString();
  const itemId = Number(queries.get('itemId'));
  const count = localStorage.getItem('count');
  const { data } = useQuery(SEE_ITEM_QUERY, { variables: { id: itemId } });
  const total = (data && data.seeItem.item.price) * count;
  const [next_redirect_pc_url, setUrl] = useState('');
  const [tid, setTid] = useState('');
   const params=[{cid: 'TC0ONETIME',
      partner_order_id: 'partner_order_id',
      partner_user_id: 'partner_user_id',
      item_name: data && data.seeItem.item.name,
      quantity: count,
      total_amount: total,
      vat_amount: 0,
      tax_free_amount: 0,
      approval_url: 'http://localhost:3000/',
      fail_url: 'http://localhost:3000/',
      cancel_url: 'http://localhost:3000/',
    }];

  axios({
    url: '/v1/payment/ready',
    method: 'POST',
    headers: {
      Authorization: 'KakaoAK 2ebcbf53928c8dfa0cbc44ed536c0d72',
      'Content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    },
    params,
  }).then(response => {
    const {
      data: { next_redirect_pc_url, tid },
    } = response;

    console.log(next_redirect_pc_url);
    console.log(tid);
    window.localStorage.setItem('tid', tid);
    setUrl(next_redirect_pc_url);
    setTid(tid);
  });

  console.log(next_redirect_pc_url);
  return window.alert(next_redirect_pc_url);
}

export default Kakaopay;