# Tree Class Documentation

The `Tree` class represents a family tree with nodes and provides various methods for managing relationships and finding information within the tree.

Our first approach was to divide the project into Front-end and Back-end. We initially considered using Django as the Back-end framework and React as the Front-end. However, we later realized that this might be unnecessary and time-consuming since the project doesn't require any database actions. Therefore, we decided to convert the code to TypeScript and handle the entire project on the client-side.

The reason to use Sha256 as a Hashing algorithm is that Sha256 is known as one of the strongest hashing algorithms. It is a One-way Hashing algorithm, which means there is no way of finding the original value from the Hashed string. Other mentioned algorithms are considered vulnerable and insecure. The time complexity of the SHA-256 cryptographic hash function is considered to be approximately O(n), where n is the length of the input message or data.

## Methods

### `findNodeById(nodeId: string): Node | null`

- **Description**: Finds a node in the tree by its Id.
- **Parameters**:
  - `nodeId` (string): The unique identifier of the node.
- **Returns**:
  - Returns the found `Node` or `null` if the node is not found.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `findPathToRoot(node: Node | null): Node[]`

- **Description**: Finds the path from a given node to the root of the tree.
- **Parameters**:
  - `node` (Node): The node for which to find the path to the root.
- **Returns**:
  - Returns an array of `Node` objects representing the path to the root.
- **Time Complexity**: O(h), where h is the height of the tree.

### `add(nodeId: string, name: string, parentNode: Node | null = null): void`

- **Description**: Adds a new node to the tree with the specified unique identifier, name, and optional parent node.
- **Parameters**:
  - `nodeId` (string): The unique Id of the new node.
  - `name` (string): The name of the new node (aka Value).
  - `parentNode` (Node | null): The parent node under which to add the new node. Default is `null` for the root node.
- **Returns**:
  - This method works just as a task that doesn't return any value.
- **Time Complexity**: O(1).

### `checkFatherChildRelation(childName: string, parentName: string): boolean`

- **Description**: Checks if a given node is a grandparent of another node based on their names.
- **Parameters**:
  - `childName` (string): The name of the child node.
  - `parentName` (string): The name of the parent node.
- **Returns**:
  - Returns `true` if the relationship exists, otherwise `false`.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `checkSiblingsRelation(firstChildName: string, secondChildName: string): boolean`

- **Description**: Checks if two given nodes are siblings based on their names.
- **Parameters**:
  - `firstChildName` (string): The name of the first child node.
  - `secondChildName` (string): The name of the second child node.
- **Returns**:
  - Returns `true` if the nodes are siblings, otherwise `false`.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `checkDistantRelation(firstChildName: string, secondChildName: string): boolean`

- **Description**: Checks if two nodes have a distant relationship by sharing the same parents up to 3 levels.
- **Parameters**:
  - `firstChildName` (string): The name of the first child node.
  - `secondChildName` (string): The name of the second child node.
- **Returns**:
  - Returns `true` if the nodes have a distant relationship, otherwise `false`.
- **Time Complexity**: O(h), where h is the height of the tree.

### `findSameAncestor(firstChildName: string, secondChildName: string): string | false`

- **Description**: Finds the common ancestor of two nodes based on their names.
- **Parameters**:
  - `firstChildName` (string): The name of the first child node.
  - `secondChildName` (string): The name of the second child node.
- **Returns**:
  - Returns the unique identifier of the common ancestor if found, otherwise `false`.
- **Time Complexity**: O(h), where h is the height of the tree.

### `findFurthestChild(nodeId: string | null): number`

- **Description**: Finds the depth of the furthest child from a given node.
- **Parameters**:
  - `nodeId` (string | null): The unique identifier of the node.
- **Returns**:
  - Returns the depth of the furthest child.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `bfs(node: Node): [Node, number] | false`

- **Description**: Performs Breadth-First Search (BFS) to find the farthest child and its depth.
- **Parameters**:
  - `node` (Node): The starting node for BFS.
- **Returns**:
  - Returns a tuple containing the farthest child node and its depth, or `false` if unsuccessful.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `getLeaves(): Node[]`

- **Description**: Gets all leaf nodes in the tree.
- **Returns**:
  - Returns an array of leaf nodes.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.

### `findLongestPath(): [string, string, number] | false`

- **Description**: Finds the longest path in the tree.
- **Returns**:
  - Returns a tuple containing the unique identifiers of the nodes at the ends of the longest path and the length of the path, or `false` if unsuccessful.
- **Time Complexity**: O(n), where n is the number of nodes in the tree.
