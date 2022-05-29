import Image from '@ckeditor/ckeditor5-image/src/image';

// ...

ClassicEditor
    .create( document.querySelector( '#editor' ), {
        // Add Image to the plugin list.
        plugins: [ Essentials, Paragraph, Bold, Italic, Image ],

        // ...
    } )
    // ...
