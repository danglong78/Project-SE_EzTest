var editor;
window.onload = function () {
    editor = com.wiris.jsEditor.JsEditor.newInstance({'language': 'en'});
    editor.insertInto(document.getElementById('editorContainer'));
};

// $('mjx-container').attr('data-mathml');
// dùng để lấy mathml
MathJax = {
    startup: {
        ready: function () {
            //
            //  Do the usual startup ready actions (create document, input/output jax, etc).
            //
            MathJax.startup.defaultReady();
            const toMML = MathJax.startup.toMML;
            //
            //  Add a post-filter to the output jax to add the extra attributes
            //
            MathJax.startup.output.postFilters.add((args) => {
                const math = args.math, node = args.data;
                const original = (math.math ? math.math :
                    math.inputJax.processStrings ? '' : math.start.node.outerHTML);
                node.setAttribute('data-original', original);
                node.setAttribute('data-mathml', toMML(math.root).replace(/\n\s*/g, ''));
            });
        }
    }
};
