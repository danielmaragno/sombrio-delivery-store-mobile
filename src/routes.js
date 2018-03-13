
import Home from './components/Home';
import Orders from './components/Orders';

const routesList = [
	{
		key: 'Home',
		screen: Home,
		routeName: 'Home',
		params: {
			title: "Início",
			leftIcon: {
				name: 'home'
			}
		}
	},
	{
		key: 'Orders',
		screen: Orders,
		routeName: 'Orders',
		params: {
			title: "Pedidos",
			leftIcon: {
				name: 'local-shipping'
			}
		}
	}
];


export default routesList;