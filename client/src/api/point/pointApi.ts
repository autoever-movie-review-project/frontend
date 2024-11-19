import { client } from 'api/client';

//랭크 정보 받아오기 Get
export const fetchMyRankInfo = async () => {
  try {
    const response = await client.get('/rank/my');
    return response.data;
  } catch (e) {
    console.error('내랭크정보받아오기 실패: ', e);
  }
};
// 리턴
// {
//     "rankName": "브론즈",
//     "rankImg": null,
//     "points": 2000,
//     "rankPercent": "20.00"
// }

//점수 주기 Post
export const fetchPlusPoint = async (requestBody: { points: number; description: string }) => {
  try {
    const response = await client.post('/point/my', requestBody);
    return response.data;
  } catch (e) {
    console.error('포인트 추가 실패: ', e);
    throw e;
  }
};

//점수 받은 히스토리 Get
export const fetchPointHistory = async () => {
  try {
    const response = await client.get('/point/my/history');
    return response.data;
  } catch (e) {
    console.error('포인트 히스토리 받아오기 실패: ', e);
  }
};
