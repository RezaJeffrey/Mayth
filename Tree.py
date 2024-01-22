from Hash import sha_256


class Node:
    def __init__(self, value: str = None, children: list['Node'] = list['Node']):
        self.value = value
        self.children = children


class Tree:
    def __init__(self):
        self.root = None

    def add(self, parent, value):
        if not self.root:
            self.root = Node(value)
            return True

        parent_node = self.find_node(self.root, parent)
        if parent_node:
            parent_node.children.append(Node(value))
            return True
        else:
            return False  # Parent not found

    def remove(self, value):
        if not self.root:
            return False  # Tree is empty

        if self.root.value == value:
            self.root = None
            return True

        parent_node, node_to_delete = self.find_parent_and_node_by_value(self.root, value)

        if parent_node and node_to_delete:
            parent_node.children.remove(node_to_delete)
            return True
        else:
            return False  # Node not found

    def size(self):
        return self.get_subtree_size(self.root)

    def get_subtree_size(self, node):
        """
        pass in the node as parent and this method will devide the tree into a
        subtree with root of provided node and cacluclate the size
        """
        if not node:
            return 0
        size = 1  # Count current node
        for child in node.children:
            size += self.get_subtree_size(child)
        return size

    def find_node(self, node, value):
        if not node:
            return None

        if node.value == value:
            return node

        for child in node.children:
            result = self.find_node(child, value)
            if result:
                return result

        return None

    def find_parent_and_node_by_value(self, value, node, parent=None) -> (Node, Node):
        if node is None:
            return None, None

        if node.value == value:
            return parent, node

        for child in node.children:
            result_parent, result_node = self.find_parent_and_node_by_value(child.value, node, parent)
            if result_node:
                return result_parent, result_node

        return None, None

    def check_child_and_grand_relation(self, parent: Node, child: Node) -> bool:

        for sub_tree_child in parent.children:
            result = self.find_node(sub_tree_child, child.value)
            if result:
                return True
        return False  # input parent is not a parent of input child node






    # TODO hash before passing in the strings
