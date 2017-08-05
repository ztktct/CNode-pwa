// 所有接口的基础地址
const BASE_URL = 'https://cnodejs.org/api/v1';

// 获取首主题列表
export const fetchTopicList = async function(page=1, tag=''){
  const response = await fetch(`${BASE_URL}/topics?page=${page}&tab=${tag}&limit=20`);
  return await response.json();
}

// 获取主题内容
export const fetchTopicDetails = async function(id){
  const response = await fetch(`${BASE_URL}/topic/${id}`);
  return await response.json();
}
