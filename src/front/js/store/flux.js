const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			token: null,
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			syncTokenFromLocalStorage: () => {
				const token = localStorage.getItem("token");
				console.log("Application just loaded, syncing the local storage token");
				if(token && token != "" && token != undefined) setStore({token: token});
			},

			logout: () => {
				localStorage.removeItem("token");
				console.log("Logged out");
				setStore({ token: null});
			},

			login: async (email, password) => {
				const options = {
					method: 'POST',
					headers: {
						"Content-type": "application/json"
					},
					body: JSON.stringify({
						"email": email,
						"password": password
					})
				}

				try{
					const resp = await fetch('https://3001-4geeksacade-reactflaskh-m8j2u82fhut.ws-eu77.gitpod.io/api/token', options)
					if(resp.status !== 200) {
						alert("There was an error");
						return false;
					}
				const data = await resp.json();
				console.log("This came from the backend", data);
				localStorage.setItem("token", data.access_token)
				setStore({token: data.access_token})
				return true;
				}

				catch(error) {
					console.error("There has been an error logging in")
				}

				
				
			},

			getMessage: async () => {
				const store = getStore();
				const options = {
					headers: {
						"Authorization": "Bearer " + store.token
					}
				}
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello", options)
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}
				catch(error){
					console.log("Error loading message from backend", error);
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
