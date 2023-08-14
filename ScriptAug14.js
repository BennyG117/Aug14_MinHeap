
/**
 * Class to represent a MinHeap which is a Priority Queue optimized for fast
 * retrieval of the minimum value. It is implemented using an array but it is
 * best visualized as a tree structure where each 'node' has left and right
 * children except the 'node' may only have a left child.
 * - parent is located at: Math.floor(i / 2);
 * - left child is located at: i * 2
 * - right child is located at: i * 2 + 1
 */
class MinHeap {
    constructor() {
      /**
       * 0th index not used, so null is a placeholder. Not using 0th index makes
       * calculating the left and right children's index cleaner.
       * This also effectively makes our array start at index 1.
       */
      this.heap = [null];
    }
//? LIST OF HELPER FUNCTIONS:
    
    // Parent is located at Math.floor(i / 2)  // Parent Function:
    idxOfParent(i){
        return Math.floor(i/2);
    }
    
    // Left child is located at i * 2.
    idxOfLeftChild(i){
        return i * 2;
    }
    
    // Right child is located at (i * 2) + 1.  
    idxOfRightChild(i){
        return i * 2 +1;
    }


    /**
     * Retrieves the top (minimum number) in the heap without removing it.
     * - Time: O(1) constant.
     * - Space: O(1) constant.
     * @returns {?number} Null if empty.
     */
    top() {
        if (this.heap.length <= 1) {
            return null;
        }
        return this.heap[1];
    }
  
    /**
     * Inserts a new number into the heap and maintains the heaps order.
     * 1. Push new num to back then.
     * 2. Iteratively swap the new num with it's parent while it is smaller than
     *    it's parent.
     * - Time: O(log n) logarithmic due to shiftUp / iterative swapping.
     * - Space: O(1) constant.
     * @param {number} num The num to add.
     */
    insert(num) {

        //pushing in parameter num
        this.heap.push(num);
        //create variable for current
        let currentIndx = this.heap.length - 1;
        while (currentIndx > 1){
            //parent current position
            let parentIndex = this.idxOfParent(currentIndx)
            //if parent is greater then swap...
            if (this.heap[parentIndex] > this.heap[currentIndx]){
                // store parent value in temp swap
                let swap = this.heap[parentIndex];
                // move current to parent
                this.heap[parentIndex] = this.heap[currentIndx];
                // move stored parent into current
                this.heap[currentIndx] = swap;
                // update current index to parent index
                currentIndx = parentIndex;
            }
            else {
                break;
            }
        }
        return this;

    }
  
    /**
     * Logs the tree horizontally with the root on the left and the index in
     * parenthesis using reverse inorder traversal.
     */
    printHorizontalTree(parentIdx = 1, spaceCnt = 0, spaceIncr = 10) {
      if (parentIdx > this.heap.length - 1) {
        return;
      }
  
      spaceCnt += spaceIncr;
      this.printHorizontalTree(parentIdx * 2 + 1, spaceCnt);
  
      console.log(
        " ".repeat(spaceCnt < spaceIncr ? 0 : spaceCnt - spaceIncr) +
          `${this.heap[parentIdx]} (${parentIdx})`
      );
  
      this.printHorizontalTree(parentIdx * 2, spaceCnt);
    }
  }



  //Test Cases -------------------------------

  let test = new MinHeap();
  console.log("Test Insert------------");
  test.insert(10).insert(9).insert(8).insert(7).insert(6).insert(5).insert(4);
  test.printHorizontalTree();
  
  console.log("Test Top------------");
  console.log(test.top()); // prints out 4

