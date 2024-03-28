/*
Nugget Name: Organizational chart with D3.js, expandable, zoomable, and fully initialized (Holding Company Tree Chart)
Nugget URI: https://onyxdev.net/snippets-item/organizational-chart-with-d3-js-expandable-zoomable-and-fully-initialized/
Author: Obada Qawwas
Author URI: https://www.onyxdev.net/
Version: 1.0
Licensed under the MIT license - http://opensource.org/licenses/MIT
Copyright (c) 2020 Onyx Web Development
*/

// Set default values to change all nodes from one place
const cardDefaults = {
    width: 350,
    height: 105,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: { red: 0, green: 0, blue: 0, alpha: 0.1 },
    backgroundColor: { red: 255, green: 255, blue: 255, alpha: 1 },
    connectorLineColor: '#d8d7d7',
    connectorLineWidth: 3,
    dashArray: '',
    expanded: false
};
const nodeImageDefaults = {
    width: 80,
    height: 80,
    centerTopDistance: 0,
    centerLeftDistance: 0,
    cornerShape: 'ROUNDED',
    shadow: false,
    borderWidth: 1,
    borderColor: { red: 0, green: 0, blue: 0, alpha: 0.15 }
};
const nodeIconDefault = { icon: './assets/media/companies-tree.svg', size: 24 };

const templateDefault = (title, afterTitle, share) => {
    // Throw error if there was no title
    if (!title) throw new Error('You have to provide a title!');

    let output = '<div class="tree-chart__card">\n';

    if (title) {
        output += `<div class="tree-chart__card__title">${title}</div>`;
    }
    if (afterTitle) {
        output += `<div class="tree-chart__card__after-title">${afterTitle}</div>\n`;
    }
    if (share) {
        output += `<div class="tree-chart__card__share">${share}</div>\n`;
    }

    output += '</div>';

    return output;
};

// Nodes data
window.data = [
    {
        nodeId: 'O-1',
        parentNodeId: null,
        nodeImage: { url: './assets/media/emp/1.png' },
        template: templateDefault('Dr. Wail Al-Qasim', 'Chairman & CEO')
    },

    {
        nodeId: '1-1',
        parentNodeId: 'O-1',
        nodeImage: { url: './assets/media/emp/2.jpg' },
        template: templateDefault('Mr. Amro Fathy', 'Chief financial officer')
    },
    {
        nodeId: '1-1-1',
        parentNodeId: '1-1',
        nodeImage: { url: './assets/media/emp/3.jpg' },
        template: templateDefault('Eng. Aladl Mohammed', 'IT Manager')
    },
    {
        nodeId: '1-1-1-1',
        parentNodeId: '1-1-1',
        nodeImage: { url: './assets/media/emp/4.jpg' },
        template: templateDefault('Eng. Hossam Ahmed', 'IT')
    },
    {
        nodeId: '1-1-1-2',
        parentNodeId: '1-1-1',
        nodeImage: { url: './assets/media/emp/14.jpg' },
        template: templateDefault('Eng. Ahmed Abdelhalim', 'IT')
    },

    {
        nodeId: '1-1-2',
        parentNodeId: '1-1',
        nodeImage: { url: './assets/media/emp/5.jpg' },
        template: templateDefault('Mr. Amr Ahmed', 'V.P - CFO',)
    },
    /////// hasnaa //////
    {
        nodeId: '1-1-2-1',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/6.jpg' },
        template: templateDefault('Mrs. Hasnaa', 'Treasury',)
    },
    {
        nodeId: '1-1-2-1-1',
        parentNodeId: '1-1-2-1',
        nodeImage: { url: './assets/media/emp/7.jpg' },
        template: templateDefault('Mr. Ahmed Salah', 'Accountant',)
    },
    {
        nodeId: '1-1-2-1-1-1',
        parentNodeId: '1-1-2-1-1',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('Mr. Mohamed Almotab', 'Accountant',)
    },
    {
        nodeId: '1-1-2-1-1-2',
        parentNodeId: '1-1-2-1-1',
        nodeImage: { url: './assets/media/emp/15.jpg' },
        template: templateDefault('Mr. Essam Abdelmonem', 'Accountant',)
    },
    /////////// salah //////////
    {
        nodeId: '1-1-2-2',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/8.jpg' },
        template: templateDefault('Mr. Salah Ibrahim', 'Accountant',)
    },
    /////////// wail mustafa//////////
    {
        nodeId: '1-1-2-3',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/9.jpg' },
        template: templateDefault('Mr. Wail Mustafa', 'General Accounts Supervisor',)
    },
    {
        nodeId: '1-1-2-3-1',
        parentNodeId: '1-1-2-3',
        nodeImage: { url: './assets/media/emp/10.jpg' },
        template: templateDefault('Mrs. Abrar Ben Saqer', 'Accountant',)
    },
    ///////// alaa abaza ///////////
    {
        nodeId: '1-1-2-4',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/11.jpg' },
        template: templateDefault('Mr. Alaa Abaza', 'Customer Supervisor',)
    },
    {
        nodeId: '1-1-2-4-1',
        parentNodeId: '1-1-2-4',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('Mr. Ziyad Eldrhmy', 'Accountant',)
    },
    ///////////  wail awad ///////////
    {
        nodeId: '1-1-2-5',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/12.jpg' },
        template: templateDefault('Mr. Wail Awad', 'Accountant',)
    },
    ///////////////// MOHAMED ELKADI ////////////////
    {
        nodeId: '1-1-2-6',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/emp/13.jpg' },
        template: templateDefault('Mr. Mohamed Elkadi', 'Bank accountant',)
    },
    {
        nodeId: '1-1-2-6-1',
        parentNodeId: '1-1-2-6',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('Mr. Ismail Halawani', 'Accountant',)
    },
    ///////////////// mohamed wail /////////
    {
        nodeId: '1-1-2-7',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('Mr. Mohamed Wail', 'Vat accountant',)
    },
    /////////////////////// mohamed nour //////////
    {
        nodeId: '1-1-2-8',
        parentNodeId: '1-1-2',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('Mr. Mohamed Nour', 'Supplier supervisor',)
    },
    {
        nodeId: '1-2',
        parentNodeId: 'O-1',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('1-2', '........', '%100')
    },
    {
        nodeId: '1-2-1',
        parentNodeId: '1-2',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('1-2-1', '.......', '%100')
    },
    {
        nodeId: '1-2-2',
        parentNodeId: '1-2',
        nodeImage: { url: './assets/media/person.jpg' },
        template: templateDefault('1-2-2', '.....', '%100')
    },

].map((node) => {
    // Set default values to not repeat them in each node
    // Node's default values
    const defaultKeys = {
        width: cardDefaults.width,
        height: cardDefaults.height,
        borderWidth: cardDefaults.borderWidth,
        borderRadius: cardDefaults.borderRadius,
        borderColor: cardDefaults.borderColor,
        backgroundColor: cardDefaults.backgroundColor,
        nodeImage: {
            width: nodeImageDefaults.width,
            height: nodeImageDefaults.height,
            centerTopDistance: nodeImageDefaults.centerTopDistance,
            centerLeftDistance: nodeImageDefaults.centerLeftDistance,
            cornerShape: nodeImageDefaults.cornerShape,
            shadow: nodeImageDefaults.shadow,
            borderWidth: nodeImageDefaults.borderWidth,
            borderColor: nodeImageDefaults.borderColor
        },
        nodeIcon: nodeIconDefault,
        connectorLineColor: cardDefaults.connectorLineColor,
        connectorLineWidth: cardDefaults.connectorLineWidth,
        dashArray: cardDefaults.dashArray,
        expanded: cardDefaults.expanded
    };

    // Set node's root default values
    Object.keys(defaultKeys).map((key) => {
        if (!node[key]) {
            node[key] = defaultKeys[key];
        }
    });

    // Set nodeImage default values
    Object.keys(defaultKeys.nodeImage).map((key) => {
        if (!node.nodeImage[key]) {
            node.nodeImage[key] = defaultKeys.nodeImage[key];
        }
    });

    return node;
});
