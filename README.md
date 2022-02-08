<h2>Backend</h2>
<ol>
    <li>Go to the backend folder</li>
    <li>Update the env</li>
    <li>Run <b>composer install</b></li>
    <li>Run <b>php artisan key:generate</b></li>
    <li>Run <b>php artisan migrate --seed</b> to generate the database and seed data</li>
    <li>Run either <b>phpunit</b> or <b>./vendor/bin/phpunit</b> to run the unit test</li>
</ol>

<h2>Frontend</h2>
<ol>
    <li>Go to the frontend folder</li>
    <li>Run <b>npm install</b></li>
</ol>