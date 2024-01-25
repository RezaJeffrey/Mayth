from Hash import sha_256


class Node:
    def __init__(self, value: str = None, children: list() = list()):
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

    def find_parent_by_value(self, value) -> Node:
        parent = self.root

        for child in parent.children:
            if child.value == value:
                return parent
            self.find_parent_by_value(child)

        return None

    def check_child_and_grand_relation(self, parent: Node, child: Node) -> bool:

        for sub_tree_child in parent.children:
            result = self.find_node(sub_tree_child, child.value)
            if result:
                return True
        return False  # input parent is not a parent of input child node

    def check_nodes_are_siblings(self, node1: Node, node2: Node):
        parent_node1 = self.find_parent_by_value(node1.value)
        parent_node2 = self.find_parent_by_value(node2.value)

        if parent_node2.value == parent_node1.value:
            return True
        return False

    def depth_of_farthest_child(self, node):
        if not node.children:
            return 0  # Leaf node, depth is 0

        max_child_depth = 0
        for child in node.children:
            child_depth = self.depth_of_farthest_child(child)
            max_child_depth = max(max_child_depth, child_depth)

        return 1 + max_child_depth

    def find_farthest_relationship(self):
        def r_find_farthest_relationship(node):
            if not node.children:
                return 0, [node.value]

            max_child_depth = 0
            farthest_nodes = [node.value]

            for child in node.children:
                child_depth, child_nodes = r_find_farthest_relationship(child)

                if child_depth + 1 > max_child_depth:
                    max_child_depth = child_depth + 1
                    farthest_nodes = [node.value] + child_nodes
                elif child_depth + 1 == max_child_depth:
                    farthest_nodes.extend(child_nodes)

            return max_child_depth, farthest_nodes

        if not self.root:
            return None  # Tree is empty

        _, farthest_relationship = r_find_farthest_relationship(self.root)
        return farthest_relationship

    def find_common_parent(self, node1, node2):
        def find_path_to_root(node, target_value):
            path = []
            while node:
                path.append(node)
                if node.value == target_value:
                    break
                node = node.parent  # Assuming each node has a reference to its parent

            return path

        path1 = find_path_to_root(node1, self.root.value)
        path2 = find_path_to_root(node2, self.root.value)

        common_parent = None

        for parent1, parent2 in zip(reversed(path1), reversed(path2)):
            if parent1 == parent2:
                common_parent = parent1
            else:
                break

        return common_parent

    # TODO hash before passing in the strings





# Program

tree = Tree()
node_A = Node("A")
node_B = Node("B")
node_C = Node("C")
node_D = Node("D")
node_E = Node("E")

# Add nodes to the tree
tree.add(None, "A")
tree.add("A", "B")
tree.add("A", "C")
tree.add("B", "D")
tree.add("B", "E")

# Print the tree structure
print("Tree structure:")
print("Size:", tree.size())
#
# # Test remove method
# removed = tree.remove("C")
# print("Node 'C' removed:", removed)
# print("Tree size after removal:", tree.size())
#
# # Test depth_of_farthest_child method
# depth_of_farthest = tree.depth_of_farthest_child(tree.root)
# print("Depth of the farthest child from root:", depth_of_farthest)
#
# # Test find_farthest_relationship method
# farthest_relationship = tree.find_farthest_relationship()
# print("Farthest relationship in the family tree:", farthest_relationship)
#
# # Test find_common_parent method
# common_parent = tree.find_common_parent(node_D, node_E)
# print("Common parent of nodes 'D' and 'E':", common_parent.value)



