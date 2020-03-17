#!/bin/bash
echo "Running script"

# Replace variables $ENV{<environment varname>}
function ReplaceEnvironmentVariable() {
    grep -rl "\$ENV{\"$1\"}" $3|xargs -r \
        sed -i "s|\\\$ENV{\"$1\"}|$2|g"
}

echo "Transforming file"
# Replace all variables
for _curVar in `env | awk -F = '{print $1}'`;do
    echo "Replacing ${_curVar} ${!_curVar}"
    # awk has split them by the equals sign
    # Pass the name and value to our function
    ReplaceEnvironmentVariable ${_curVar} ${!_curVar} /etc/nginx/conf.d/default.conf
done

echo "Running nginx"
# Run nginx
exec /usr/sbin/nginx