export class GridItemFormatValueConverter {
    toView(value, property, format) {
        if (format) {
            return format(value);
        }

        return value[property];
    }
}