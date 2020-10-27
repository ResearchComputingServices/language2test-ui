import _ from 'lodash';
import { rolesChecker } from '../providers';

class DrawerAssemblerService {
    constructor(roles) {
        this.roles = roles;
    }

    isItemAuthorized(item) {
        const {
            roles,
            operator,
        } = item;
        let auth = [];
        if (_.isString(roles)) {
            auth.push(roles);
        }
        if (_.isArray(roles)) {
            auth = auth.concat(roles);
        }
        auth = _.uniq(auth);
        const options = _.isNil(operator) ? undefined : { operator };
        return rolesChecker(this.roles).contains(auth, options);
    }

    flattenItems(items) {
        const panelStack = [items];
        const flattenedPanel = [];
        while (panelStack.length !== 0) {
            const items = panelStack.pop();
            _.each(items, item => {
                if (_.isArray(item.items)) {
                    panelStack.push(item.items);
                } else if (_.isObject(item)) {
                    this.isItemAuthorized(item) && flattenedPanel.push(item);
                }
            });
        }
        return flattenedPanel;
    }

    assembleItems(items) {
        const newList = [];
        _.each(items, item => {
            if (_.eq(item, 'divider')) {
                newList.push(item);
                return true;
            }
            const { items: innerItems } = item;
            if (!_.isNil(innerItems)) {
                const filteredItems = this.assembleItems(innerItems);
                item.items = filteredItems;
                !_.isEmpty(filteredItems) && newList.push(item);
                return true;
            }
            this.isItemAuthorized(item) && newList.push(item);
            return true;
        });
        let dividerCounter = 0;
        _.each(newList, item => {
            if (_.eq(item, 'divider')) {
                ++dividerCounter;
            }
        });
        return !_.eq(dividerCounter, newList.length) ? newList : [];
    }
}

const drawerAssemblerService = new DrawerAssemblerService();

Object.freeze(drawerAssemblerService);

export default drawerAssemblerService;

export { DrawerAssemblerService };
