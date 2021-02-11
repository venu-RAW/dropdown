import { Component } from "react";
import axios from "axios";
import DropDown from "./components/DropDown/DropDown";

const url = "https://venu-raw.github.io/personsMockData/profileData.json";

class App extends Component {
	state = {
		data: [],
	};

	componentDidMount = async () => {
		try {
			let searchData = await axios(url);

			if (searchData) {
				this.setState({
					data: [...searchData.data],
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	showResult = (result) => {
		console.log(`Result: `, result);
	};

	render() {
		const { data } = this.state;
		return (
			<DropDown
				data={data}
				displayKey="lastName"
				searchKeys={["firstName", "lastName", "university"]}
				prompt="Select"
				result={this.showResult}
			/>
		);
	}
}

export default App;
