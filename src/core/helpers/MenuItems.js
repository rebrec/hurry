import { observable, action } from 'mobx'

class MenuItemElement {
    @observable properties;
    constructor(properties){
        this.updateProperties(properties);
        this.parent = null;
        this.isContainer = this.isContainer.bind(this);
    }

    isContainer(){
        return this.hasOwnProperty("children");
    }

    @action.bound updateProperties(properties){
        this.properties = properties
    }

    moveToParent(){
        return this.parent.moveToParent(this);
    }

    moveUp(){
        return this.parent.moveElementUp(this);
    }

    moveDown(){
        return this.parent.moveElementDown(this);
    }

    static fromObject(obj){
        return new MenuItemElement(obj);
    }

    toObject(){
        return this.properties;
    }
}



class MenuItemContainer extends MenuItemElement{
    @observable children  = [];

    constructor(properties){
        super(properties);
    }

    static fromObject(obj){
        if (!obj) { throw "No object provided" }
        if (!obj.hasOwnProperty('children')) { throw "Object doesn't have a 'children' property ! " + JSON.stringify(obj); }
        const properties = {};
        Object.assign(properties, obj);
        delete properties.children;

        const c = new MenuItemContainer(properties);
        for (let i=0;i<obj.children.length;i++){
            let elt = obj.children[i];
            let e;
            if (elt.hasOwnProperty('children')){
                e = MenuItemContainer.fromObject(elt);
            } else {
                e = MenuItemElement.fromObject(elt);
            }
            c.addElement(e);
        }
        return c;
    }

    childrenAt(idx){
        return this.children[idx];
    }


    @action.bound addNewMenuItemContainer(properties={}){
        return this.addElement(new MenuItemContainer(properties));
    }

    @action.bound addNewMenuItemElement(properties={}){
        return this.addElement(new MenuItemElement(properties));
    }


    @action.bound addElement(element){
        element.parent = this;
        this.children.push(element);
        return element;
    }
    @action.bound removeElement(element){
        const idx = this.children.indexOf(element);
        if (idx !== -1) {
            this.children.splice(idx, 1);
        }
        return element;
    }

    moveElementAt(element, pos) {
        this.removeElement(element);
        this.insertElement(element, pos);
        return element;
    }


    moveToParent(element) {
        if (this.parent === null) { return element; }
        const newIdx = this.children.indexOf(element) - 1;
        this.removeElement(element);
        this.parent.insertElement(element, newIdx);
        return element;
    }



    moveElementUp(element) {
        const newIdx = this.children.indexOf(element) - 1;
        this.removeElement(element);
        this.insertElement(element, newIdx);
        return element;
    }

    moveElementDown(element) {
        const newIdx = this.children.indexOf(element) + 1;
        this.removeElement(element);
        this.insertElement(element, newIdx);
        return element;
    }

    @action.bound insertElement(element, pos){
        element.parent = this;
        if (pos<0) { pos = 0 }
        if (pos >= this.children.length) { pos = this.children.length }
        this.children.splice(pos, 0, element)
        return element;
    }

    toObject(){
        const tmpObj = {};
        Object.assign(tmpObj, this.properties);
        tmpObj.children = [];
        for (let i=0;i<this.children.length;i++){
            const child = this.children[i];
            tmpObj.children.push(child.toObject());
        }
        return tmpObj;
    }
}

export {
    MenuItemElement,
    MenuItemContainer
}