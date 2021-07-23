import axios from 'axios'

const api = axios.create({
	baseURL: '/API/item/list',
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});
api.interceptors.request.use(
	config => {
		config.method='get';
		config.params={
			groupId:config.url,
			owner:'xinsu-group'
		}
		config.url='';
		return config;
	},
	error => Promise.reject(error)
);
api.interceptors.response.use(
	response => {
		if ((response.status === 200 || response.status === 201)&&response.data.code===200) {
			return Promise.resolve(response.data.data);
		} else {
			return Promise.reject(response);
		}
	},
	error => Promise.reject(error)
);

//need
export const getHealth=()=>api.get('2000001')

export const getEnterpriseTop=()=>api.get('2000000')
export const getEnterpriseLeft1=(url)=>api.get(url)
export const getEnterpriseLeft2Year=()=>api.get('2000003')
export const getEnterpriseLeft2Month=()=>api.get('2000002')
export const getEnterpriseRight2Year=()=>api.get('2000005')
export const getEnterpriseRight2Month=()=>api.get('2000004')
export const getEnterpriseRight3=()=>api.get('2000006')
export const getEnterpriseRight31=()=>api.get('2000007')

export const getSaleLeft1=()=>api.get('3000000')
export const getSaleRight3=()=>api.get('3000006')
export const getSaleLeft3=()=>api.get('3000001')
export const getSaleLeft4=()=>api.get('3000002')
export const getSaleMiddle=()=>api.get('3000003')
export const getSaleRight1=()=>api.get('3000004')
export const getSaleRight2=()=>api.get('3000005')

export const getProductLeft1=()=>api.get('4000000')
export const getProductLeft3=()=>api.get('4000001')
export const getProductLeft31=()=>api.get('4000007')
export const getProductLeft4=()=>api.get('4000002')
export const getProductRight1=()=>api.get('4000003')
export const getProductRight11=()=>api.get('4000005')
export const getProductRight2=()=>api.get('4000004')
export const getProductRight21=()=>api.get('4000006')

export const getStoreLeft1=()=>api.get('5000000')
export const getStoreMiddle1=()=>api.get('5000001')
export const getStoreMiddle2=()=>api.get('5000004')
export const getStoreMiddle3=()=>api.get('5000002')


export default api;
