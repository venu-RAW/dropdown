import React, { Component } from "react";
import SearchBar from "../SearchBar/SearchBar";
import styles from "./DropDown.module.scss";
import PropTypes from "prop-types";

/**
 * This package is used to handle the close of the dropdown when click outside of the component.
 */
import onClickOutside from "react-onclickoutside";

/**
 * Renders a <DropDown /> component
 * @component
 *	<DropDown
 *		data={data}
 *		displayKey="firstName"
 *		searchKeys={["firstName", "lastName", "university"]}
 *		result={this.showResult}
 *	/>
 */

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

	/**
	 * @function resultList
	 * @param resultArray
	 * Sets resultArray inside state.
	 */
	resultList = (resultArray) => {
		this.setState({
			resultArray: [...resultArray],
		});
	};

	/**
	 * @function onClickHandler
	 * @param value
	 * Sets selectedValue inside state and the selectedValue value is passed to result().
	 */
	OnClickHandler = (value) => {
		const { result, data } = this.props;
		this.setState({
			selectedValue: value,
			resultArray: data,
		});
		result(value);
	};

	render() {
		const { showDropDown, selectedValue, resultArray } = this.state;
		const { data, searchKeys, prompt, displayKey, result } = this.props;
		const listData = resultArray.length ? resultArray : data;

		/**
		 * @function handleClickOutside
		 * Sets showDropDown inside state.
		 */
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
								resultList={this.resultList}
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

DropDown.propTypes = {
	/**
	 * The data type must be an array of objects ( Required ).
	 */
	data: PropTypes.array.isRequired,
	/**
	 * The searchKeys type must be array of object keys.
	 */
	searchKeys: PropTypes.arrayOf(PropTypes.string),
	/**
	 * The promt type must be a string. It is like a placeholder for the dropdwon.
	 */
	promt: PropTypes.string,
	/**
	 * The alignIcon type must be a string ( left or right )
	 * By default is "right"
	 */
	alignIcon: PropTypes.oneOf(["left", "right"]),
	/**
	 * The type of the displayKey must be a string. This prop is used when
	 * SearchBar component is used with the DropDown component.
	 */
	displayKey: PropTypes.string,
	/**
	 * The result type must funciton. It shows the result for the query.
	 */
	result: PropTypes.func.isRequired,
};

DropDown.defaultProps = {
	prompt: "Search",
};

/**
 * @object outsideClickConfig
 * This configuration object takes a key of handleCLickOutside which is set as a function that is been created  * before with the same name. This funciton is used for the processing of the outside the component click events.
 */
const outsideClickConfig = {
	handleClickOutide: () => DropDown.handleClickOutside,
};

/**
 * Wrap the DropDown component with the onOutsideClick Wrapper along with the configuration file.
 */
export default onClickOutside(DropDown, outsideClickConfig);
