function Boat() {

    var id = 0,
        name = '';

    function render() {
        return `
            <div id="${id}" class="boat">
                <div class="name">${name}</div>
                <div class="status"></div>
                <div class="left stopped"></div>
                <div class="eta enroute"></div>
                <div class="departs enroute"></div>
            </div>
        `;
    }

    return {
        id: id,
        name: name,
        toHtml: render
    }
}

module.exports = Boat();