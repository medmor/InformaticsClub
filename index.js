import ClassicEditor from '@ckeditor/ckeditor5-editor-classic/src/classiceditor';
import Essentials from '@ckeditor/ckeditor5-essentials/src/essentials';
import Paragraph from '@ckeditor/ckeditor5-paragraph/src/paragraph';
import Bold from '@ckeditor/ckeditor5-basic-styles/src/bold';
import Italic from '@ckeditor/ckeditor5-basic-styles/src/italic';
import Image from '@ckeditor/ckeditor5-image/src/image';
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Range from "@ckeditor/ckeditor5-engine/src/view/range";
import Position from '@ckeditor/ckeditor5-engine/src/view/position';
import TreeWalker from '@ckeditor/ckeditor5-engine/src/view/treewalker';


class Pagination extends Plugin {
    init() {
        var range = new Range( new Position(this.editor.model.document.getRoot()));
        this.editor.model.document.on( 'change:data', () => {
            console.log( range);
        } );
        
    }
}

ClassicEditor
    .create(document.querySelector('#editor'), {
        // Add Image to the plugin list.
        plugins: [Essentials, Paragraph, Bold, Italic, Image, Pagination],
        toolbar: ['bold', 'italic']
    })


