<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Seeders extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('roles')->insert([
            ['role_name' => 'Administrador','created_at' => now(),'updated_at' => now(),],
            ['role_name' => 'Clientes','created_at' => now(),'updated_at' => now(),],
        ]);
        DB::table('users')->insert([
            'name' => 'Admin User',
            'email' => 'admin@admin.com',
            'password' => Hash::make('admin'),
            'phone' => '0000-0000',
            'address' => '123 Admin St',
            'role_id' => 1, // Asegúrate de que 1 corresponde al rol de administrador
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}

