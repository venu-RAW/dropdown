import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import onClickOutside from "react-onclickoutside";
// import "./DropDown.css";
import styles from "./DropDown.module.scss";
// import PropTypes from "prop-types";

class DropDown extends Component {
	state = {
		showDropDown: false,
		selectedValue: null,
		resultArray: [],
	};

	toggle = () => {
		const { showDropDown } = this.state;
		this.setState({
			showDropDown: !showDropDown,
		});
	};

	OnClickHandler = (value) => {
		const { result } = this.props;
		this.setState({
			selectedValue: value,
		});

		result(value);
	};

	render() {
		const { showDropDown, selectedValue, resultArray } = this.state;
		const { data, searchKeys, prompt, displayKey, result } = this.props;
		const listData = resultArray.length ? resultArray : data;

		DropDown.handleClickOutside = () => {
			const { showDropDown } = this.state;
			this.setState({
				showDropDown: !showDropDown,
			});
		};

		return (
			<>
				<div className={styles.dropdown}>
					<div className={styles.control}>
						<div className={styles.selectedValue}>
							<p>{selectedValue ? selectedValue[displayKey] : prompt}</p>
						</div>
						<div className={styles.arrow} onClick={this.toggle}>
							<i
								className={`fas fa-sort-${
									showDropDown ? `up ${styles.up}` : "down"
								}`}
							></i>
						</div>
					</div>
					{showDropDown && (
						<div className={styles.options}>
							<SearchBar
								searchData={data}
								displayKey={displayKey}
								searchKeys={searchKeys}
								resultList={(resultArray) => {
									this.setState({
										resultArray: [...resultArray],
									});
								}}
								alignIcon="left"
								result={result}
							/>
							{listData.map((data) => {
								return (
									<div
										tabIndex={0}
										key={data.id}
										className={styles.option}
										onKeyPress={() => {
											this.OnClickHandler(data);
											this.toggle();
										}}
										onClick={() => {
											this.OnClickHandler(data);
											this.toggle();
										}}
									>
										{data[displayKey]}
									</div>
								);
							})}
						</div>
					)}
				</div>
			</>
		);
	}
}

const outsideClickConfig = {
	handleClickOutside: () => DropDown.handleClickOutside,
};

export default onClickOutside(DropDown, outsideClickConfig);
