module.exports = function (grunt) {
    grunt.initConfig({
        less: {
            development: {
                options: {
                    paths: ["assets/less"],
                    yuicompress: true
                },
                files: {
                    "../assets/css/styles.css": "../assets/less/styles.less",
                }
            }
        },
        watch: {
            files: "../assets/less/*",
            tasks: ["less"]
        }
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
};