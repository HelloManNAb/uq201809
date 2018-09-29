class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: false,
            update: -1,
            // items: [[400000,60, "auto"], [8000,12, "mobil"], [30000,10, "dovolena"]],
            // items: [[60000,12, "notebook"], [9000,24, "mobil"]],
            items: [],
            name: "",
            months: "",
            amount: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeAmount = this.handleChangeAmount.bind(this);
        this.handleChangeMonths = this.handleChangeMonths.bind(this);
        this.handleChangeName   = this.handleChangeName.bind(this);
    }

    render() {
        let end = 0;

        return <div><form onSubmit={this.handleSubmit}>
            <h2>Vstup</h2>
            {this.state.error ? <div className="alert alert-danger" role="alert">
                <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
                <span className="sr-only">Error:</span>
                <span> Chybicka ;-) <br />(Exception: {this.state.error})</span>
            </div> : ""}

            <table className={"table table-bordered table-striped table-hover"}>
                <thead style={{background: "#EEEEEE"}}>
                    <tr><th>Částka</th><th>Počet měsíců</th><th>Název</th><th>Akce</th></tr>
                    <tr>
                        <th><input type={"text"} value={this.state.amount} name={"amount"} onChange={this.handleChangeAmount} /></th>
                        <th><input type={"text"} value={this.state.months} name={"months"} onChange={this.handleChangeMonths} /></th>
                        <th><input type={"text"} value={this.state.name}   name={"name"}   onChange={this.handleChangeName}   /></th>
                        <th><button type={"submit"} className={"btn btn-default"} onClick={this.handleSubmit}>{this.state.update >= 0 ? "uprav" : "přidej"}</button></th>
                    </tr>
                </thead>
                <tbody>
                {this.state.items.map((it, index) => {
                    return <tr key={"in" + index + Math.random()} style={this.state.update == index ? {background: "#B9FFC1"} : {}}>
                        <td>{it[0]}</td>
                        <td>{it[1]}</td>
                        <td>{it[2]}</td>
                        <td>
                            <button className={"btn btn-default"} onClick={() => this.handleChange(index)}>uprav</button>
                            <button className={"btn btn-danger"} onClick={() => this.handleRemove(index)}>odeber</button>
                        </td>
                    </tr>
                })}
                </tbody>
            </table>

            <h2>Výstup</h2>
            <table className={"table table-bordered table-striped table-hover"}>
                <thead style={{background: "#EEEEEE"}}>
                    <tr><th>Interval</th><th>Částka</th></tr>
                </thead>
                <tbody>
                {algorithm(this.state.items).map((it, index) => {
                    let start = end;
                    end = end -+- it[1];

                    return <tr key={"out" + index + Math.random()}><td>{start -+- 1}. - {end}. měsíc</td><td>{it[0]}</td></tr>
                })}
                </tbody>
            </table>
        </form></div>
    }

    handleChangeName(event)   {this.setState({name  : event.target.value});}
    handleChangeMonths(event) {this.setState({months: event.target.value});}
    handleChangeAmount(event) {this.setState({amount: event.target.value});}

    handleSubmit(event) {
        event.preventDefault();
        try {
            let items = this.state.items.slice(0);
            let item = [this.state.amount, this.state.months, this.state.name];
            if (this.state.update >= 0) {
                items[this.state.update] = item;
            } else {
                items.push(item);
            }

            algorithm(items);
            this.setState({update: -1, error: false, items: items, amount: "", months: "", name: ""});
            this.focus();
        } catch (e) {
            this.setState({error: e.toString()});
        }
    }

    handleChange(index) {
        let item = this.state.items[index];
        this.setState({update: index, error: false, amount: item[0], months: item[1], name: item[2]});
        this.focus();
    }

    handleRemove(index) {
        this.setState({update: -1, items: this.state.items.filter((it, itIndex) => index != itIndex)});
    }

    focus() {
        document.getElementsByName("amount")[0].focus();
    }

}
