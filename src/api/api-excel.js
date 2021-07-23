import axios from 'axios'
const api = axios.create({
	baseURL: '/API/manage',
	headers: {
		Accept: "application/json",
		"Content-Type": "application/json"
	}
});
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

export const getMenusA=(owner)=>api.get('/page/list',{
	params:{
		owner
	}
})
export const getDetailA=(owner,id)=>api.get('/page/detail',{
	params:{
		pageId:id,
		owner
	}
})
export const delFlieA=(id)=>api.post('/file/delete',{},{
	params:{
		fileId:id
	}
})

